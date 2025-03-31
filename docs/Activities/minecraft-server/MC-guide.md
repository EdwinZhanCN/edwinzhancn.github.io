# Minecraft-server

Yes, you are invited. If you cannot read English, please use [This Web Translator](https://immersivetranslate.com/en/)

## Mod Installation Guide (Fabric)

This guide will walk you through installing mods for Minecraft 1.21.4 using the Fabric mod loader.

**Prerequisites:**

*   **Minecraft 1.21.4:**  Ensure you have Minecraft 1.21.4 installed and have run it at least once.

### Installer

#### For Mods

we use fabric

*  [fabric-installer](https://fabricmc.net/use/installer/)

#### For Shaders (Shaders are not installed on server)

I use Iris

-  [Iris-Installer](https://www.irisshaders.dev/download)

### Mods List {#mods-list}

**The mods files:** 

*   [fabric-api-0.115.1+1.21.4.jar](https://modrinth.com/mod/fabric-api/version/0.115.1+1.21.4)
*   [fabric-language-kotlin-1.13.0+kotlin.2.1.0.jar](https://www.curseforge.com/minecraft/mc-mods/fabric-language-kotlin/files/5950505)
*   [InventoryProfilesNext-fabric-1.21.4-2.1.0.jar](https://www.curseforge.com/minecraft/mc-mods/inventory-profiles-next/files/5937110)
*   [iris-fabric-1.8.4+mc1.21.4.jar](https://modrinth.com/mod/iris/version/1.8.4+1.21.4-fabric)
*   [libIPN-fabric-1.21.3-6.2.0.jar](https://modrinth.com/mod/libipn/version/fabric-1.21.3-6.2.0)
*   [sodium-fabric-0.6.7+mc1.21.4.jar](https://modrinth.com/mod/sodium/version/mc1.21.4-0.6.7-fabric)
*   [modmenu-13.0.1.jar](https://modrinth.com/mod/modmenu/version/13.0.1)
*   [appleskin-fabric-mc1.21.3-3.0.6.jar](https://modrinth.com/mod/appleskin/version/cHQjeYVS)
*   [entity_model_features_fabric_1.21.4-2.4.1.jar](https://modrinth.com/mod/entity-model-features/version/n0dDeW4R)
*   [entity_texture_features_fabric_1.21.4-6.2.10.jar](https://modrinth.com/mod/entitytexturefeatures/version/441qELLe)
*   [tweakeroo-fabric-1.21.4-0.23.1.jar](https://modrinth.com/mod/tweakeroo/version/0.23.1)
*   [XaerosWorldMap_1.39.3_Fabric_1.21.4.jar](https://modrinth.com/mod/xaeros-world-map/version/1.39.3_Fabric_1.21.4)
*   [Xaeros_Minimap_25.1.0_Fabric_1.21.4.jar](https://modrinth.com/mod/xaeros-minimap/version/25.1.0_Fabric_1.21.4)

[Zip File For Above Initial Package](https://drive.google.com/file/d/1cDLm9mCsZr_2qInrS151-V_he-tW7v_H/view?usp=sharing)

**Updated Mods:**
*   [malilib-fabric-1.21.4-0.23.2.jar](https://modrinth.com/mod/malilib/version/0.23.2)
*   [tweakeroo-fabric-1.21.4-0.23.2.jar](https://modrinth.com/mod/tweakeroo/version/0.23.2)
*   [litematica-fabric-1.21.4-0.21.2.jar](https://modrinth.com/mod/litematica/version/0.21.2)

**Using Git to get mods**:
1. Intall Git [Here](https://git-scm.com/downloads)
2. Open `PowerShell` or `Terminal` on you PC
3. Navigate to the `minecraft`  folder in your PC, type following command in PowerShell or Terminal.
```shell
# Windows PowerShell
cd $env:APPDATA\.minecraft
# Mac Terminal
cd ~/Library/Application Support/minecraft
```
3. Use following command to get the mods folder, if you already had a mods folder, please remove/delete it.
```shell
git clone https://github.com/EdwinZhanCN/mod-pack.git mods
```
4. if the mods is updated, and an email is send to you,  you can open up a new PowerShell/Terminal, repeat the step 2 and 3 then execute following command on `minecraft` directory.
```shell
cd mods
git fetch
git pull
```

### Explore Shaders Using Iris Online!

Recommends (High Compatibility, Apple M-Series, etc.):
1. [BSL Shaders](https://modrinth.com/shader/bsl-shaders/version/8.4.01.2)
2. [Complementary Shaders - Unbound](https://modrinth.com/shader/complementary-unbound/version/r5.4)

For High Performance PC (With Ray-Tracing)
1. [Iteration T 3.+](https://texture-packs.com/shaders/iteration/#download)
Note. To Make Sure This Shader Run on Iris, You Need to Download The [Latest Iris Loader](https://www.irisshaders.dev/download). 

#### Shaders Installation:
- [Install Iris & Shaders](#iris-install)
## Video For Installing Mods

(powered by Manim)
<video  controls src="../../FabricInstallationOptimized.mp4" type="video/mp4" />

## Steps:

### 1. Install Fabric Mod Loader

2.  **Locate your Minecraft directory:** This is where your Minecraft files are stored. The default locations are:
    *   **Windows:** `%appdata%\.minecraft` (You can copy and paste this into the File Explorer address bar)
    *   **macOS:** `~/Library/Application Support/minecraft` (Open Finder, press `Cmd+Shift+G`, and paste this path)
    *   **Linux:** `~/.minecraft` or `~/.local/share/minecraft`

3.  **Run the Fabric Installer:**
    *   Double-click the `fabric-installer-1.0.1.jar` file.  If it doesn't open automatically, right-click and select "Open with..." and choose Java (or the Java Runtime Environment).

4.  **Configure the Installer:**
    *   **Minecraft Version:** Make sure `1.21.4` is selected.
    *   **Loader Version:** Choose the latest available Fabric Loader version.
    *   **Installation Location:** It should automatically point to your `.minecraft` directory.  If not, browse to the location you found in Step 1.
    *   **Create Profile:**  Leave this box checked.
    *   Click **Install**.

5.  **Success Message:**  You should see a confirmation message when the installation is complete.

### 2. Install the Mods

6.  **Locate the `mods` Folder:**  In your `.minecraft` directory, you should now have a `mods` folder. If it doesn't exist, create one.

7.  **Copy the Mod Files:** Copy all the `.jar` files from [Mods List](#mods-list)

### 3. Install Iris & Shaders {#iris-install}
1.  **Run the Iris Installer:**
    *   Double-click the `Iris-Installer-3.2.1.jar` file.  If it doesn't open automatically, right-click and select "Open with..." and choose Java (or the Java Runtime Environment).
    *   A menu will appear, click the "Install" button.
2. **Install Shader:**
	-   Prepare the `.zip` file of your shader. **Do not unzip the file!** 
	-   Create a new folder named `shaderpacks` under your `.minecraft` directory
	-   Move your `.zip` file to the `shaderpacks` folder.

### 4. Launch Minecraft with Fabric

3.  **Open the Minecraft Launcher.**
4.  **Select the Fabric Profile:** Before launching, in the bottom-left corner, click on the profile selection (it probably says "Latest Release" or "Minecraft 1.21.4").
5.  **Choose the Fabric Loader Profile:**  Select the profile that starts with "Fabric Loader" and includes the Minecraft 1.21.4 version.  If you don't see it, you may need to enable "Modded" versions in the Installations tab.
6.  **Play:** Click the "Play" button.

## Troubleshooting

*   **Minecraft Crashes:**
    *   Ensure all mods are for Minecraft 1.21.4 and Fabric.
    *   Check for mod conflicts. Try removing mods one by one to see if one is causing the issue.
    *   Update your graphics drivers.
    *   Make sure you have enough RAM allocated to Minecraft in the launcher settings.
*   **Fabric Profile Missing:**
    *   Go to the "Installations" tab in the Minecraft Launcher.
    *   Make sure "Modded" is checked in the filter options (usually at the top).
    *   If the profile is still missing, re-run the Fabric Installer.
*   **Java Issues:**
    *   Ensure you have Java 22 or later installed.
    *   If you have multiple Java versions, make sure the Fabric Installer and Minecraft are using the correct one.

Enjoy playing Minecraft 1.21.4 with your mods!

