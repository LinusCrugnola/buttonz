// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is deactivated
export function deactivate() {}

function runCommandInTerminal(terminalName :string, command :string) {
    // Find an existing terminal with the specified name
    const existingTerminal = vscode.window.terminals.find(terminal => terminal.name === terminalName);

    // Check if the terminal exists
    if (existingTerminal) {
        existingTerminal.show();
        existingTerminal.sendText(command);
    } else {
        // If the terminal doesn't exist, create a new one
        const newTerminal = vscode.window.createTerminal({ name: terminalName });
        newTerminal.show();
        newTerminal.sendText(command);
    }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Access settings from settings.json
    const config = vscode.workspace.getConfiguration('buttonz');
    const command1 = config.get('launch', 'echo "launch"');
    const command2 = config.get('build', 'echo "build"');
    const command3 = config.get('clean', 'echo "clean"');
    const command4 = config.get('upload', 'echo "upload"');

    // Define terminals
    const launchTerminal = 'Launch';
    const buildTerminal = 'Build';
    const cleanTerminal = 'Clean';
    const uploadTerminal = 'Upload';

    // Register command handlers
    vscode.commands.registerCommand('buttonz.launch', () => {
        runCommandInTerminal(launchTerminal, command1);
    });

    vscode.commands.registerCommand('buttonz.build', () => {
        runCommandInTerminal(buildTerminal, command2);
    });

    vscode.commands.registerCommand('buttonz.clean', () => {
        runCommandInTerminal(cleanTerminal, command3);
    });

    vscode.commands.registerCommand('buttonz.upload', () => {
        runCommandInTerminal(uploadTerminal, command4);
    });
}

