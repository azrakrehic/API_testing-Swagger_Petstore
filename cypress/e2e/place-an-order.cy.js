describe('Place an order', () => {
    let pet = {
        "id": 145,
        "name": "Rex",
        "category": {
            "id": 1,
            "name": "psi"
        },
        "photoUrls": [
            "slika1"
        ],
        "tags": [{
            "id": 0,
            "name": "rex_1"
        }],
        "status": "dostupan"
    }

    let order = {
        "id": 9,
        "petId": 145,
        "quantity": 7,
        "shipDate": "2022-10-26T16:51:33.628+00:00",
        "status": "odobrena",
        "complete": true
    }

    let validateResponseForCreating = (data) => {
        expect(data.id).to.eq(pet.id)
        expect(data.category.id).to.eq(pet.category.id)
        expect(data.category.name).to.eq(pet.category.name)
        expect(data.name).to.eq(pet.name)
        for (let i = 0; i < pet.tags.length; i++) {
            expect(data.tags[i].id).to.eq(pet.tags[i].id)
            expect(data.tags[i].name).to.eq(pet.tags[i].name)
        }
    }

    let validateStatus = (data) => {
        expect(data.allRequestResponses[0]["Response Status"]).to.eq(200)
    }

    let validateResponseForOrder = (data) => {
        expect(data.id).to.eq(order.id)
        expect(data.petId).to.eq(order.petId)
        expect(data.quantity).to.eq(order.quantity)
        expect(data.shipDate).to.eq(order.shipDate)
        expect(data.status).to.eq(order.status)
        expect(data.complete).to.eq(order.complete)
    }



    before(() => {
        cy.request("POST", "https://petstore3.swagger.io/api/v3/pet", pet).then((data) => {
            validateStatus(data)
            validateResponseForCreating(data.allRequestResponses[0]["Response Body"])
        })
    })

    it('Placing an order via POST method', () => {
        cy.request("POST", "https://petstore3.swagger.io/api/v3/store/order", order).then((data) => {
            validateStatus(data)
            validateResponseForOrder(data.allRequestResponses[0]["Response Body"])
        })
    })
    it('Getting an order by id via GET method', () => {
        cy.request("GET", "https://petstore3.swagger.io/api/v3/store/order/" + order.id).then((data) => {
            validateStatus(data)
            cy.log(JSON.stringify(data))
            validateResponseForOrder(JSON.parse(data.allRequestResponses[0]["Response Body"]))
        })
    })
    it ('Deleting order by id', () => {
        cy.request("DELETE", "https://petstore3.swagger.io/api/v3/store/order/" + order.id).then((data) => {
            validateStatus(data)
        })
    })

})