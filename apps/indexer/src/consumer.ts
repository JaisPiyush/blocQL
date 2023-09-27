import { Command } from 'commander';
import { runSolanaConsumers } from './chains/solana';

const consumers: Record<string, Record<string, () => Promise<void>>> = {
    solana: {
        test: runSolanaConsumers,
    },
};

const program = new Command();

// Create a program that will accept a command line argument
// called "name" and "branch"
program
    .requiredOption('-n, --name <name>', 'name of the indexer')
    .requiredOption(
        '-b, --branch <branch>',
        "branch of the indexer ('main' | 'test')"
    );

program.parse(process.argv);
const options = program.opts();

if (!options.name || !options.branch) {
    console.error('Missing required options "name" or "branch"');
    process.exit(1);
}

if (consumers[options.name] === undefined) {
    console.error(`Unknown indexer '${options.name}'`);
    process.exit(1);
}

if (consumers[options.name][options.branch] === undefined) {
    console.error(
        `Unknown branch '${options.branch}' for indexer '${options.name}'`
    );
    process.exit(1);
}

consumers[options.name][options.branch]().catch((e) => {
    console.error(e);
    process.exit(1);
});
