'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Property = use('App/Models/Property')

class PropertyController {

  async index () {
    const properties = Property.all()

    return properties
  }

  async store ({ request, response }) {
  }

  async show ({ params }) {
    const property = await Property.findOrFail(params.id)

    await property.load('images')

    return property
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response, auth }) {
    const property = await Property.findOrFail(params.id)

    if (property.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await property.delete()
  }
}

module.exports = PropertyController
