import request from 'supertest'
import { app } from '../src/index'
import { authMiddleware } from '../src/middleware/authMiddleware'
import { Request, Response } from 'express'
import * as cigarQueries from '../src/dbQueries/cigarsQueries'

jest.mock('../src/middleware/authMiddleware', () => {
  return {
    authMiddleware: (req: Request, res: Response, next: () => void) => {
      req.user = {
        id: "1",
        app_metadata: {},
        user_metadata: {},
        aud: "",
        created_at: ""
      }
      next()
    }
  }
})

jest.mock('../src/dbQueries/cigarsQueries')


describe('Cigars Api', () => {
  test("Get all cigars test", async () => {
    await request(app).get('/cigars')

    expect(cigarQueries.getCigarsQuery).toHaveBeenCalled()
  });

  test("Add new cigar", async () => {
    const newCigar = {
      name: "testName"
    }

    await request(app).post('/createCigar').send({
      cigar: newCigar
    })

    const expectedFuncCall = {
      cigar: newCigar,
      uid: "1"
    }
    expect(cigarQueries.createCigarQuery).toHaveBeenCalledWith(expectedFuncCall)
  })

  test("Update Cigar", async () => {
    const updatedCigar = {
      id: 1,
      name: "updateName"
    }

    await request(app).post("/cigar/1").send({
      cigar: updatedCigar
    })

    const expectedArgs = {
      cigar: updatedCigar,
      uid: "1"
    }

    expect(cigarQueries.updateCigarQuery).toHaveBeenCalledWith(expectedArgs)
  })
})
