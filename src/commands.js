export const COMMANDS = {
    EXIT: {
        description: "exit from file manager",
        syntax: ".exit",
        command: ".exit",
    },
    UP: {
        description: "Go upper from current directory",
        syntax: "up",
        command: "up",
    },
    CD: {
        description: "Go to dedicated folder from current directory ",
        syntax: "cd path_to_directory",
        command: "cd",
    },
    LS: {
        description:
            "Print in console list of all files and folders in current directory",
        syntax: "ls",
        command: "ls",
    },
    CAT: {
        description: "Read file and print it's content in console",
        syntax: "cat path_to_file",
        command: "cat",
    },
    ADD: {
        description: "Create empty file in current working directory",
        syntax: "add new_file_name",
        command: "add",
    },
    MKDIR: {
        description: "Create new directory in current working directory",
        syntax: "mkdir new_directory_name",
        command: "mkdir",
    },
    RN: {
        description: "Rename file",
        syntax: "rn path_to_file new_filename",
        command: "rn",
    },
    CP: {
        description: "Copy file",
        syntax: "cp path_to_file path_to_new_directory",
        command: "cp",
    },
    MV: {
        description: "Move file",
        syntax: "mv path_to_file path_to_new_directory",
        command: "mv",
    },
    RM: {
        description: "Delete file",
        syntax: "rm path_to_file",
        command: "rm",
    },
    OS: {
        description: "show os information (use flags)",
        syntax: "os [--EOL | --cpus | --homedir | --username | --architecture ]",
        command: "os",
    },
    HASH: {
        description: "Calculate hash for file and print it into console",
        syntax: "hash path_to_file",
        command: "hash",
    },
    COMPRESS: {
        description: "Compress file (using Brotli algorithm)",
        syntax: "compress path_to_file path_to_destination",
        command: "compress",
    },
    DECOMPRESS: {
        description: "Decompress file (using Brotli algorithm)",
        syntax: "decompress path_to_file path_to_destination",
        command: "decompress",
    },
    HELP: {
        description:
            "prints help, accept optional parameter to print command help",
        syntax: "help [?command]",
        command: "help",
    },
};
