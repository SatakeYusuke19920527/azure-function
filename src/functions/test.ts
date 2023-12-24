import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { testFunc } from "../util";
export async function test(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const result = testFunc()
    console.log("🚀 ~ file: test.ts:6 ~ test ~ result:", result)
    const name = request.query.get('name') || await request.text() || 'world';
    return { body: `Hello, ${name}!` };
};

app.http('test', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: test
});
