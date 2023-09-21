export const actions = {
    login: async ({ locals, fetch }) => {
        console.log("Login form action", locals.formData);
        await fetch("/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify(locals.formData)
        });
    },
    register: async ({ locals, fetch }) => {
        console.log("Register called", locals.formData);
        await fetch("/api/v1/auth/register", {
            method: "POST",
            body: JSON.stringify(locals.formData)
        });
    }
}