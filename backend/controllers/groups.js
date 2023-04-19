const { object } = require('joi')
const Group = require('../models/groups')
const mongoose = require('mongoose')
const { paginate } = require('../utilities/util')

exports.addGroup = async(req, res) => {
    const group = new Group(req.body)
    await group.save()
    return res.status(201).send(group)
}

exports.getAllGroups = async(req, res) => {
    // let filter = {}
    // if (req.query.phase) {
    //     filter.phase = req.query.phase;
    // }
    const query = await Group.find({})
    
    return res.status(200).send(query)
}

exports.getGroupById = async (req, res) => {
    const { id } = req.params
    const event = await Group.findOne({_id: id})
    if(!event){
        return res.status(404).send('Group not found!')
    }
    return res.status(200).send(event)
}

exports.updateGroup = async (req, res) => {
    const { id } = req.params
    const group = await Group.findOne({_id: id})
    if(!group){
        return res.status(404).send(`Group with id ${id} is not found`)
    }
    Group.set(req.body)
    await group.save()
    return res.status(200).send(group)
}

exports.addgroupMember= async(req, res) => {
    const { id } = req.params
   
    const {member_id} = req.body
    const group = await Group.findOne({_id: id})
    if(!group){
        return res.status(404).send(`group with id ${id} is not found`)
    }
   
    await Group.updateOne({_id: id}, {$push: {members:  member_id}})
    const groups = await Group.findOne({_id: id})
    return res.status(200).send({message: 'group updated successfully!', groups})
}
exports.removeMemberFromGroup= async(req, res) => {
    const { id } = req.params
    const {member_id} = req.body

    const group = await Group.findOne({_id: id})
    if(!group){
        return res.status(404).send(`group with id ${id} is not found`)
    }
   
    await Group.updateOne({_id: id}, {$pull: {members:  mongoose.Types.ObjectId(member_id)}})
    const groups = await Group.findOne({_id: id})
    return res.status(200).send({message: 'group updated successfully!', groups})
}
exports.deletegroup = async (req, res) => {
    const { id } = req.params
    const group = await Group.findOne({_id: id})
    if(!group){
        return res.status(404).send(`group with id ${id} is not found`)
    }
    await group.remove()
    return res.status(200).send(group)
}
