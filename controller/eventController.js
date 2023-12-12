const Event = require('../models/eventModel'); 

const eventController = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getEventById: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  searchEventByTitle: async (req, res) => {
    try {
      const { title } = req.query;

      if (!title) {
        return res.status(400).json({ message: 'Please provide a title parameter' });
      }

      const events = await Event.find({ title: new RegExp(title, 'i') });

      if (events.length === 0) {
        return res.status(404).json({ message: 'No events found with the provided title' });
      }

      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addEvent: async (req, res) => {
    try {
      const newEvent = new Event(req.body);
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = eventController;
