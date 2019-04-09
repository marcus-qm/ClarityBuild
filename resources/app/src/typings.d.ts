declare module "*.json" {
    const value: any;
    export default value;
}

interface Window {
    require: NodeRequire;
  }