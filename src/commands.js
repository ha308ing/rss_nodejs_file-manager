export const commands = {
    help: {
        description:
            "prints help, accept optional parameter to print command help",
        syntax: "help [?command]",
    },
    cat: {
        description: "Read file and print it's content in console",
        syntax: "cat path_to_file",
    },
    add: {
        description:
            "Create empty file in current working directory (optional second argument for file content)",
        syntax: "add new_file_name [?content]",
    },
    rm: {
        description: "remove file",
        syntax: "rm file",
    },
    os: {
        description: "show os information (use flags)",
        syntax: "os [--EOL | --cpus | --homedir | --username | --architecture ]",
    },
    cd: {
        description: "Go to dedicated folder from current directory",
        syntax: "cd path_to_directory",
    },
    up: {
        description: "Go upper from current directory",
        syntax: "up [?depth]",
    },
    ls: {
        description:
            "Print in console list of all files and folders in current directory",
        syntax: "ls",
    },
    rn: {
        description: "Rename file",
        syntax: "rn path_to_file new_filename",
    },
    cp: {
        description: "Copy file",
        syntax: "cp path_to_file path_to_new_directory",
    },
    mv: {
        description: "Move file",
        syntax: "mv path_to_file path_to_new_directory",
    },
    rm: {
        description: "Delete file",
        syntax: "rm path_to_file",
    },
    hash: {
        description: "Calculate hash for file and print it into console",
        syntax: "hash path_to_file",
    },
    compress: {
        description: "Compress file (using Brotli algorithm)",
        syntax: "compress path_to_file path_to_destination",
    },
    decompress: {
        description: "Decompress file (using Brotli algorithm)",
        syntax: "decompress path_to_file path_to_destination",
    },
};
