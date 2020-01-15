import Dev from '../models/Dev';

import FormatTechs from '../utils/FormatTechs';

class SearchController {
  async index(req, res) {
    try {
      const { latitude, longitude, techs } = req.query;

      const TechsArray = FormatTechs(techs);

      const devs = await Dev.find({
        techs: {
          $in: TechsArray,
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            $maxDistance: 10000,
          },
        }
      })

      return res.json(devs)
    } catch (err) {
      return res.json({ error: 'Waiting more informations...' })
    }
  }
}

export default new SearchController();