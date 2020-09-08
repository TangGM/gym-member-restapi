const express = require('express');
const router = express.Router();
const Member = require('../models/members')

// get all
router.get('/', async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (e) {
        // 500 stands for server error
        res.status(500).json({message: e.message});
    }
});

// get one
router.get('/:id', getMember, (req, res) => {
    res.json(res.member);
});

// create one
router.post('/', async (req, res) => {
    const member = new Member({
        name: req.body.name,
        branch: req.body.branch
    });

    try {
        const newMember = await member.save();
        // 200 created successfully
        res.status(201).json(newMember);
    } catch (e) {
        // 400 wrong user input
        res.status(400).json({ message: e.message });
    }
});

// update one
router.patch('/:id', getMember, async (req, res) => {
    if (req.body.name != null) {
        res.member.name = req.body.name;
    }
    if (req.body.branch != null) {
        res.member.branch = req.body.branch;
    }

    try {
        const updatedMember = await res.member.save();
        res.json(updatedMember);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// delete one
router.delete('/:id', getMember, async (req, res) => {
    try {
        await res.member.remove();
        res.json({ message: "Deleted member"});
    } catch (e) {
        res.status(500).json({ message: e.message});
    }
});

// middleware
async function getMember(req, res, next) {
    let member;
    try {
        member = await Member.findById(req.params.id);
        if (member == null) {
            return res.status(404).json({ message: "Cannot find this member"});
        }
    } catch (e) {
        return res.status(500).json({ message: e.message});
    }
    res.member = member;
    next();
}


module.exports = router;
