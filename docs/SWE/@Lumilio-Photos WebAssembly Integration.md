# @Lumilio-Photos WebAssembly Integration

## Introduction

This article introduce a elegant WebAssembly (Wasm) architecture that can brings capability for solving computional complex task everywhere in your React application. Before read through is article, you need to be familiar with those Tech Stacks:

- React: modern JavaScript based frontend framework
- TypeScript: Super set of JavaScript, includes type definition and type checking

Reference Project is Luminilio Photos, provided link is not up to date but align with the article.

### WebAssembly

**What**

*WebAssembly,* namely, it is the Assembly language on Web (?). It is a low-level language with a compact binary format, enabling near-native performance.  It serves as a compilation target for languages like C/C++, C#, and Rust, allowing them to run on the web alongside JavaScript.

**Why**

The reason to use WebAssembly is to bring near-native performance to your React application. By offloading computationally intensive tasks to WebAssembly, you can improve the overall performance and user experience of your application. For example, you can easily wrap Fast Hash function in Rust and use it in your React application, or even you can use ONNX model to perform ML task which uses WebGPU.

### WebWorker

### DOM

## Design Pattern

### Wasm module (Rust) & WebWorker Communication

*wasm-pack*

### WebWorker & DOM Communication

*Design a hook*

*Design a context*

*Design a component*

## Discussion with Gemini Pro 2.5

# User

Now, you are a Senior Software Engineer and Code quality tester from FAANG with broad knowledge of frontend web framework design and implementation in React, WebAssembly and Multithreading. Please Review the WebAsssembly Architecture in this Media Manage Web App. Includes, workerClient, wokers, custom hooks/contexts, and consumer components. Base on your understanding, no bias. Think Critically and answer following questions:

## What do you see? Could you explain the design pattern of this architecture, How they communicates, integrated and work together base on the principle of softwares.

## How confident you are about this architecture in real production? Describe your feelings and show your understandings.

## What are the Pros and Cons, do Cons in the context of this application really impact a lot?

## Any other you want to say? Improvements?

## Industrial Pratice
