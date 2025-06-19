# @Culinex-Recipe Mastering SwiftData

## Introduction

This article will concentrate on building a robust architecture for a comprehensive application that encompasses various types of data. Before reading this article, I highly recommend you have some swift projects build on your own. We will adhere to the best practices [outlined](./@Culinex-Recipe Data Management Keys) by Gemini for Data Management.

Reference Project: [Culinex-Recipe](https://github.com/EdwinZhanCN/Culinex-Recipe)
Reference Documentation: [SwiftData - Apple Developer](https://developer.apple.com/documentation/swiftdata)
Language: *Swift*
Packages:
- *Swift Foundations*
- *SwiftData*
- *SwiftUI*
- *SwiftTest*
Opening on SwiftData Documentation: *Write your model code declaratively to add managed persistence and efficient model fetching.*

## Topics on Apple's Documentation

To understand why developers at Apple want to bring SwiftData to their platform is important. Topics concentrated on eight sections: **Essentials**, **Model definition**, **Model life cycle**, **Model fetch**, **Model Storage**, **History life cycle**, **Codable support** and **Errors**

Let's try to map the topics to our best practice outline:
- *Essentials*: Separation of Concerns, Single Source of Truth, Handling State and Reactivity
- *Model definition*: Data Integrity and Validation, Manage Relationships
- *Model life cycle*: Separation of Concerns, Single Source of Truth, Explicit State Updates
- *Model fetch*: Performance Considerations, Abstraction and Interfaces
- *Model Storage*: Abstraction and Interfaces, Schema Evolution and Migrations, Security and Privacy
- *History life cycle*: Handling State and Reactivity, Single Source of Truth
- *Codable support*: Abstraction and Interfaces, Data Integrity and Validation
- *Errors*: Error Handling

The only missing topic related to our best practice would be **Testability**, which is thing we care more about on the level of program design.

## What Data We Need?

In the remainder of this article, all examples will focus on the design of the Culinex Recipe. So, let's take a look into what data we need for a recipe application.

In traditional recipe, we describe how to make a dish in words, we call it **description**. That's it, traditional recipe only have one type of data. 

In order to make our recipe smart, versatile and user-friendly, we wanna extract or separate the data from **description**. We will do it in top-bottom way. In Culinex Recipe, I systematically interpret recipe into steps, called `RecipeStep`. Think of Recipe consisting of different `RecipeStep`s, we must build a `List` or `Tree` of `RecipeStep` to ensure we realize the ***Streaming workflow*** and ***Parallel workflow*** like the real world scenario. Here, we will use `List` or `Array` to store `RecipeStep`s in a `Recipe` for simplicity. 

Next, we use similar approach to break down the information in `RecipeStep`.

Consider real world scenario, each cooking step must contains following properties:
- "Description for single step"
	- "Tools mentioned in description?"
	- "Ingredients mentioned in description?"
		- "Amount of Ingredients"
	- "Skills uses?"
- "Timer"

So far, we just break down the information in a `Recipe`, that is good enough for a descent recipe application. And model them into codes in SwiftData is easy, we are likely to create a class for each properties I mentioned. Take the top-level model `RecipeStep` as an example

```swift
import Foundation
import SwiftData

@Model // Use @Model macro to convert a Swift class into a stored model that’s managed by SwiftData.
class RecipeStep: Identifiable { // RecipeStep is Identifiabe because it stores in arraylist
    var descrip: String // shorten the field name
    
    var tools: [Tool]? // Tool is a codable struct
    var duration: StepTime // StepTime is codable struct
    
    @Relationship(inverse: \Skill.recipeSteps) var skills: [Skill]? // Skill is another stored model
    @Relationship(deleteRule: .cascade)
    var stepIngredients = [RecipeIngredient]()// Ingredient is another stored model
    @Relationship(inverse: \Recipe.steps) var recipe: Recipe?


    init(
        description: String,
        duration: StepTime
    ) {
        self.descrip = description
        self.duration = duration
    }
}
```

The type of member variables is depends on the persistence, relationship, and nullability of the data. The persistence here is determined by the `@Model` macro, the relationship is defined by the `@Relationship` macro, the nullability is defined by the`Optional?` modifier of Swift. 

The nullability and persistence is easy to understand. If we want the data persistently stay in our storage, and you don't want to strongly bind them with other data, you need use `Class` and `@Model` to build a Model Schema. `Class` is required, we want our model has *Single Source of Truth*, it help to define a clear data flow in your application, which prevents inconsistencies. For nullability, we just not sure if we need some data at some point. Take Ingredient as an example, some `RecipeStep` has no ingredients involved, like "Place a stand into pot". 

When it comes to relationship, I want to elaborate more by providing the Model Schema of `Skill`, `Ingredient` and `Recipe`

```swift
@Model
class Recipe: Identifiable {
	// Unique Identifer of this data model
    @Attribute(.unique) var name: String
    // Some required attributes
    var summary: String
    var creationDate: Date

	// Define Relationship, and deleteRule
    @Relationship(deleteRule: .cascade)
    var steps=[RecipeStep]()

	// Stored properties that you want to omit from writes to the persistent storage
    @Transient
    var recipeViews: Int = 0
    
    init(
        name: String,
        summary: String
    ) {
        self.name = name
        self.summary = summary
        self.creationDate = Date()
    }
}
```

`@Relationship` tells Swift, "Hey, there is some relation ship with this persistent model", so for statement like `@Relationship var ingredients: [Ingredient]?` actually not defined what exact relationship it have.  But in SwiftData convention, we need to explicitly "tell" the Swift this data field is under relationship with some. For statement like `@Relationship(inverse: \Recipe.steps) var recipe: Recipe?` exactly defined how `RecipeStep` related with `Recipe`, they are *one-to-many* relationship, where Recipe in One, RecipeStep is Many. We also set `Recipe?` to optional, that's because we're not sure which recipe we gonna added into just after we create a `RecipeStep`. 

Usage:

```swift
let newRecipeStep = RecipeStep(...) // Recipe? field wait for establish relationship
let newRecipe = Recipe(...)// [RecipeStep]() field wait for establish relationship

newRecipe.steps.append(newRecipeStep) // relationship established
context.insert(newRecipe) // insert to context
```

How about Many2Many relationship? If you just want simple connection, in this example, many `RecipeStep`s could have different skills, many skills could belongs to different `RecipeStep`

```swift
import Foundation
import SwiftData

@Model
class Skill: Identifiable {
    @Attribute(.unique) var id: UUID
    var name: String
    var category: String
    var ARFileName: String?
    // No @Relationship macro here, we defined in RecipeStep
    var recipeSteps: [RecipeStep] = []
    
    init(
        id: UUID = UUID(),
        name: String,
        category: String = "General",
    ) {
        self.id = id
        self.name = name
        self.category = category
    }
    
    // Different icon for each category
    var icon: String {
        switch category {
            case "General": return "frying.pan"
            case "Cutting": return "frying.pan"
            case "Cooking": return "flame"
            case "Baking": return "oven"
            default: return "frying.pan"
        }
    }
}
```

How to use?

```swift
let newSkill = Skill(...)
let newStep = RecipeStep(...)

newSkill.recipeSteps.append(newStep)
modelContext.insert(newSkill)
```

For more complex situation, like the `Ingredient` and `RecipeStep`, they are not simply Many2Many relationship, but we also care about "How Many?". This brings us to add a layer between `Ingredient` and `RecipeStep` called `RecipeIngredient`. 

Firstly, we keep our `Ingredient` Model simple, that is the information needs to be shown to users.

```swift
@Model
class Ingredient: Identifiable {
    @Attribute(.unique) var name: String
    var image: Data?
    
    init(name: String) {
        self.name = name
    }
}
```

Secondly, build a middle layer called `RecipeIngredient` that defines the data and relationship **only** existing in between `RecipeStep` and `Ingredient` , like the amount of ingredient.

```swift
import Foundation
import SwiftData

@Model
final class RecipeIngredient {
    var quantity: Double
    var unit: String
    
    // Relashionship, which step does this amount of recipe belongs to?
    @Relationship(inverse: \RecipeStep.stepIngredients) var step: RecipeStep
    
    // Relashionship, which ingredient we want to establish actually is
    var ingredient: Ingredient?
    
    init(quantity: Double, unit: String, ingredient: Ingredient, step:RecipeStep) {
        self.quantity = quantity
        self.unit = unit
        self.ingredient = ingredient
        self.step = step
    }
}
```

Usage:

```swift
let step1 = RecipeStep(...)
let flour = Ingredient(...)
let flourUsage = RecipeIngredient(...)

context.insert(step1)
```

Hey, have you notice that, it is wired for us to only do `insert` action here. A single `RecipeStep` have many `RecipeIngredient`, we need to append the `flourUsage` to `step1`! Yes? No! SwiftData is designed for *Single Source of Truth*, when we manipulate data with a relationship, the workflow should be:
- Initialize a Model (properties with/without relationship)
- Establish Relationship
	- like if our children model initialized the without relationship, and the parent model (usually the model with optional field) have been initialized without determine nullity or empty list, need to append children to parent, then insert the parent into context. For example `flourUsage` and `step1`, `RecipeStep` and `Recipe`
	- but for our `RecipeIngredient` model. The purpose we made this model is to establish connection, so we don't want it appears to be solely. We kinda force it to bind a `RecipeStep` at initialization. Therefore, we don't need to establish relationship again, cuz we've establish the relationship at init phrase.
- Insert to Context

