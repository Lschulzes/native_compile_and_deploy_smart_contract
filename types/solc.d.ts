declare module "solc" {
  export type CompileArgs = {
    language: string;
    sources: any;
    settings: {
      metadata: {
        useLiteralContent: boolean;
      };
      outputSelection: any;
    };
  };
  import { CompileResult } from "solc-typed-ast";
  export function compile(args: CompileArgs): string;
}
