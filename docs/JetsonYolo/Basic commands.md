# Basic commands

## Ubuntu Command Line Tutorial for Beginners

### Getting Started

1. Open the Terminal

   :

   - You can open the terminal by pressing `Ctrl + Alt + T` or by searching for "Terminal" in the applications menu.

### Basic Commands

1. **Navigating the File System**:

   - ```
     pwd
     ```

     : Print Working Directory. Shows the current directory you are in.

     ```
     bash
     Copy code
     pwd
     ```

   - ```
     ls
     ```

     : List. Lists files and directories in the current directory.

     ```
     bash
     Copy code
     ls
     ```

   - ```
     cd
     ```

     : Change Directory. Moves you to a different directory.

     ```
     bash
     Copy code
     cd /path/to/directory
     ```

     Example:

     ```
     bash
     Copy code
     cd Documents
     ```

2. **File and Directory Operations**:

   - ```
     mkdir
     ```

     : Make Directory. Creates a new directory.

     ```
     bash
     Copy code
     mkdir new_directory
     ```

   - ```
     touch
     ```

     : Creates a new, empty file.

     ```
     bash
     Copy code
     touch new_file.txt
     ```

   - ```
     cp
     ```

     : Copy. Copies files or directories.

     ```
     bash
     Copy code
     cp source_file destination
     ```

     Example:

     ```
     bash
     Copy code
     cp file.txt /home/user/Documents
     ```

   - ```
     mv
     ```

     : Move. Moves or renames files or directories.

     ```
     bash
     Copy code
     mv old_name new_name
     ```

     Example:

     ```
     bash
     Copy code
     mv file.txt new_directory/
     ```

   - ```
     rm
     ```

     : Remove. Deletes files or directories.

     ```
     bash
     Copy code
     rm file.txt
     ```

     To remove a directory and its contents, use:

     ```
     bash
     Copy code
     rm -r directory_name
     ```

3. **Viewing and Editing Files**:

   - ```
     cat
     ```

     : Concatenate. Displays the contents of a file.

     ```
     bash
     Copy code
     cat file.txt
     ```

   - ```
     nano
     ```

     : A simple text editor. Opens a file for editing.

     ```
     bash
     Copy code
     nano file.txt
     ```

   - ```
     less
     ```

     : Views the content of a file one screen at a time.

     ```
     bash
     Copy code
     less file.txt
     ```

4. **System Information and Management**:

   - ```
     df -h
     ```

     : Displays disk space usage.

     ```
     bash
     Copy code
     df -h
     ```

   - ```
     free -h
     ```

     : Displays memory usage.

     ```
     bash
     Copy code
     free -h
     ```

   - ```
     top
     ```

     : Displays running processes and system resource usage.

     ```
     bash
     Copy code
     top
     ```

   - ```
     uname -a
     ```

     : Displays system information.

     ```
     bash
     Copy code
     uname -a
     ```

5. **Installing and Managing Software**:

   - ```
     sudo apt update
     ```

     : Updates the list of available packages and their versions.

     ```
     bash
     Copy code
     sudo apt update
     ```

   - ```
     sudo apt upgrade
     ```

     : Installs the latest versions of all installed packages.

     ```
     bash
     Copy code
     sudo apt upgrade
     ```

   - ```
     sudo apt install package_name
     ```

     : Installs a new package.

     ```
     bash
     Copy code
     sudo apt install package_name
     ```

     Example:

     ```
     bash
     Copy code
     sudo apt install curl
     ```

6. **Using `man` (Manual) Pages**:

   - ```
     man
     ```

     : Displays the manual for a command.

     ```
     bash
     Copy code
     man command_name
     ```

     Example:

     ```
     bash
     Copy code
     man ls
     ```

### Shortcuts and Tips

- `Ctrl + C`: Stops the current command.
- `Ctrl + Z`: Suspends the current command.
- `Ctrl + R`: Searches command history.
- `Tab`: Auto-completes file and directory names.

### Practice

Try creating a directory, navigating into it, creating a file, and then viewing its contents:

```
bash
Copy code
mkdir my_first_directory
cd my_first_directory
touch hello.txt
echo "Hello, Ubuntu!" > hello.txt
cat hello.txt
```

This should give you a good start with using the command line in Ubuntu. Practice these commands, and you'll become more comfortable with the terminal. If you have any questions or need further assistance, feel free to ask!