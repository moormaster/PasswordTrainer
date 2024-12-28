// vi: ts=2 et

import { assert } from 'chai'
import { beforeEach, describe, it } from 'vitest'
import { ScoreDataFeeHoursAndLockHoursComparator } from '../../../../src/js/app/comparator/ScoreDataFeeHoursAndLockHoursComparator.mjs'

const scoreDataNew = {
  lastSuccessScore: null,
  lastSuccessTimestamp: null,
}

const scoreDataLocked = {
  lastSuccessScore: 1,
  lastSuccessTimestamp: new Date().getTime(),
}

const scoreDataReady = {
  lastSuccessScore: 1,
  lastSuccessTimestamp: new Date().getTime() - 1000 * 60 * 60 - 1,
}

const scoreDataFee = {
  lastSuccessScore: 1,
  lastSuccessTimestamp: new Date().getTime() - 1000 * 60 * 60 * 2,
}

let comparator

describe('ScoreDataFeeHoursAndLockHoursComparator', function () {
  beforeEach(function () {
    comparator = new ScoreDataFeeHoursAndLockHoursComparator()
  })

  it("should order fee'd score before new score", function () {
    assert.isOk(comparator.compare(scoreDataFee, scoreDataNew) < 0)
  })

  it("should order fee'd score before ready score", function () {
    assert.isOk(comparator.compare(scoreDataFee, scoreDataReady) < 0)
  })

  it("should order fee'd score before locked score", function () {
    assert.isOk(comparator.compare(scoreDataFee, scoreDataLocked) < 0)
  })

  it('should order ready score before new score', function () {
    assert.isOk(comparator.compare(scoreDataReady, scoreDataNew) < 0)
  })

  it('should order ready score before locked score', function () {
    assert.isOk(comparator.compare(scoreDataReady, scoreDataLocked) < 0)
  })

  it('should order new score before locked score', function () {
    assert.isOk(comparator.compare(scoreDataNew, scoreDataLocked) < 0)
  })
})
