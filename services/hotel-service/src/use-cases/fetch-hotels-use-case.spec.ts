import { Hotel } from '@tbh/core'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryHotelsRepository } from '@/repositories/test/in-memory-hotels-repository'

import { FetchHotelsUseCase } from './fetch-hotels-use-case'

let HotelsRepository: InMemoryHotelsRepository
let sut: FetchHotelsUseCase

describe('Fetch Hotels Use Case (unit tests)', () => {
  beforeEach(() => {
    HotelsRepository = new InMemoryHotelsRepository()
    sut = new FetchHotelsUseCase(HotelsRepository)
  })

  it('should be able get user profile', async () => {
    await HotelsRepository.create(
      Hotel.create({
        name: 'Hotel Test 01',
      }),
    )
    await HotelsRepository.create(
      Hotel.create({
        name: 'Hotel Test 02',
      }),
    )
    const result = await sut.execute({ page: 1, limit: 10 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.hotels).toHaveLength(2)
  })
})
