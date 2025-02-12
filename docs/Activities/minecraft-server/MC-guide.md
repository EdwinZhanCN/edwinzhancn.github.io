# Minecraft-server

Yes, you are invited.

## Mod Installation Guide (Fabric)

This guide will walk you through installing mods for Minecraft 1.21.4 using the Fabric mod loader.

**Prerequisites:**

*   **Minecraft 1.21.4:**  Ensure you have Minecraft 1.21.4 installed and have run it at least once.

### Installer

#### For Mods

we use fabric

*   [fabric-installer-1.0.1.jar](https://fabricmc.net/use/installer/)

#### For Shaders (Shaders are not installed on server)

I use Iris

- [Iris-Installer-3.2.1.jar](https://www.irisshaders.dev/download)

### Mods List

**The mods files:** 

*   [fabric-api-0.115.1+1.21.4.jar](https://modrinth.com/mod/fabric-api/version/0.115.1+1.21.4)
*   [fabric-language-kotlin-1.13.0+kotlin.2.1.0.jar](https://www.curseforge.com/minecraft/mc-mods/fabric-language-kotlin/files/5950505)
*   [InventoryProfilesNext-fabric-1.21.4-2.1.0.jar](https://www.curseforge.com/minecraft/mc-mods/inventory-profiles-next/files/5937110)
*   [iris-fabric-1.8.4+mc1.21.4.jar](https://modrinth.com/mod/iris/version/1.8.4+1.21.4-fabric)
*   [libIPN-fabric-1.21.3-6.2.0.jar](https://modrinth.com/mod/libipn/version/fabric-1.21.3-6.2.0)
*   [sodium-fabric-0.6.7+mc1.21.4.jar](https://modrinth.com/mod/sodium/version/mc1.21.4-0.6.7-fabric)
*   [modmenu-13.0.1.jar](https://modrinth.com/mod/modmenu/version/13.0.1)
*   [appleskin-fabric-mc1.21.3-3.0.6.jar](https://modrinth.com/mod/appleskin)
*   [journeymap-fabric-1.21.4-6.0.0-beta.37.jar](https://modrinth.com/mod/journeymap/version/1.21.4-6.0.0-beta.37+fabric)
*   [entity_model_features_fabric_1.21.4-2.4.1.jar](https://modrinth.com/mod/entity-model-features/version/n0dDeW4R)
*   [entity_texture_features_fabric_1.21.4-6.2.10.jar](https://modrinth.com/mod/entitytexturefeatures/version/441qELLe)


### Explore Shaders Using Iris Online!

## Steps:

## 1. Install Fabric Mod Loader

1.  **Locate your Minecraft directory:** This is where your Minecraft files are stored. The default locations are:
    *   **Windows:** `%appdata%\.minecraft` (You can copy and paste this into the File Explorer address bar)
    *   **macOS:** `~/Library/Application Support/minecraft` (Open Finder, press `Cmd+Shift+G`, and paste this path)
    *   **Linux:** `~/.minecraft` or `~/.local/share/minecraft`

2.  **Run the Fabric Installer:**
    *   Double-click the `fabric-installer-1.0.1.jar` file.  If it doesn't open automatically, right-click and select "Open with..." and choose Java (or the Java Runtime Environment).

3.  **Configure the Installer:**
    *   **Minecraft Version:** Make sure `1.21.4` is selected.
    *   **Loader Version:** Choose the latest available Fabric Loader version.
    *   **Installation Location:** It should automatically point to your `.minecraft` directory.  If not, browse to the location you found in Step 1.
    *   **Create Profile:**  Leave this box checked.
    *   Click **Install**.

4.  **Success Message:**  You should see a confirmation message when the installation is complete.

## 2. Install the Mods

1.  **Locate the `mods` Folder:**  In your `.minecraft` directory, you should now have a `mods` folder. If it doesn't exist, create one.

2.  **Copy the Mod Files:** Copy all the `.jar` files from [ModList](#Mods List)

## 3. Install Iris
1.  **Run the Iris Installer:**
    *   Double-click the `Iris-Installer-3.2.1.jar` file.  If it doesn't open automatically, right-click and select "Open with..." and choose Java (or the Java Runtime Environment).
    *   A menu will appear, click the "Install" button.

## 4. Launch Minecraft with Fabric

1.  **Open the Minecraft Launcher.**
2.  **Select the Fabric Profile:** Before launching, in the bottom-left corner, click on the profile selection (it probably says "Latest Release" or "Minecraft 1.21.4").
3.  **Choose the Fabric Loader Profile:**  Select the profile that starts with "Fabric Loader" and includes the Minecraft 1.21.4 version.  If you don't see it, you may need to enable "Modded" versions in the Installations tab.
4.  **Play:** Click the "Play" button.

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

