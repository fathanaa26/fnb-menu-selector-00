const handler = require('../handlers.js')

test('rendering home page', () => {
    const req = {}
    const res = {render: jest.fn()}
    handler.home(req, res)
    expect(res.render.mock.calls[0][0]).toBe('home')

})

test('rendering about page w/ quotes', () => {
    const req = {}
    const res = {render: jest.fn()}
    handler.about(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('about')
    expect(res.render.mock.calls[0][1]).toEqual(
        expect.objectContaining({
            quotes: expect.stringMatching(/\W/)
        })
    )
})

test("rendering 404 page", () => {
    const req = {};
    const res = {render:jest.fn()}
    handler.notFound(req,res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('404')
})

test("rendering 500 page", () => {
    const err = new Error('500 error test')
    const next = jest.fn()
    const req = {}
    const res = {render: jest.fn()}
    handler.intError(err, req, res, next)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('500')
})