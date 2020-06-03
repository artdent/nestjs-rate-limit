export const fakeExecutionContext = (
    request: any = { ip: '127.0.0.1', user: undefined },
    response: any = { set: jest.fn() },
) => ({
    getClass: jest.fn(() => ({ name: 'className' })),
    getHandler: jest.fn(() => ({ name: 'handlerName' })),
    switchToHttp: jest.fn(() => ({
        getRequest: () => request,
        getResponse: () => response,
    })),
});
