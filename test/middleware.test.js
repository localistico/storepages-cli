import { expect, test } from 'vitest'

import {
  templatesMiddleware,
  notFoundMiddleware,
} from '../src/liquid/middleware.js'

test('should return function', async () => {
  expect(templatesMiddleware).toBeInstanceOf(Function)
  expect(notFoundMiddleware).toBeInstanceOf(Function)
})
