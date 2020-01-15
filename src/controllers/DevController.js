import Dev from '../models/Dev';
import * as Yup from 'yup';
import api from '../services/api';

import FormatTechs from '../utils/FormatTechs';

class DevController {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  }

  async store(req, res) {
    const {
      github_username, techs, latitude, longitude,
    } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const { data } = await api.get(`/${github_username}`);

      const { name = login, avatar_url, bio } = data;

      const TechsFormatted = FormatTechs(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: TechsFormatted,
        location,
      });
    }

    return res.json(dev);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      techs: Yup.string(),
      name: Yup.string(),
      avatar_url: Yup.string(),
      bio: Yup.string(),
      latitude: Yup.number(),
      longitude: Yup.number(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Information not match with Validation' })
    }

    const { git: github_username } = req.params;

    const { techs, name, avatar_url, bio, latitude, longitude } = req.body;

    const TechsFormatted = FormatTechs(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const devUpdate = await Dev.findOneAndUpdate({ github_username }, {
      techs: TechsFormatted,
      name,
      avatar_url,
      bio,
      location
    })


    return res.json(devUpdate)
  }

  async delete(req, res) {
    const { git: github_username } = req.params;

    const devDeleted = await Dev.findOneAndDelete({ github_username })

    return res.json(devDeleted)
  }
}

export default new DevController();
