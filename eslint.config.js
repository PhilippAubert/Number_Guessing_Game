export default [
    {
        files: ["**/*.js"], 
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module"
        },
        rules: {
            indent: ["error", 4],     
            semi: ["error", "always"],   
            quotes: ["error", "double"],
            "no-unused-vars": "warn",
            "no-console": "off",
            "arrow-spacing": ["error", { before: true, after: true }]
        }
    }
];