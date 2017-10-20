const uuid = require('uuid/v4')

const robots = [{ id: uuid(),
                    name: 't-1000',
                    objective: 'kill john connor',
                    materials: 'titanium skeleton'

}]

function getAll(){
  return robots
}

function getOne(id){
  let result = robots.find(robot => robot.id === id)
  if(!result) return {status: 400, message: 'no robot found'}
  return result
}

function create(body){
  const errors = []
  const name = body.name
  const objective = body.objective
  const materials = body.materials

  let response
  if ((!name || !objective) || !materials) {
    errors.push('Need name, objective, and materials in body')
    response = { errors }
  } else {
    const robot = { name }
    robot.id = uuid()
    robot.name = name
    robot.objective = objective
    robot.materials = materials
    robots.push(robot)
    response = robot
  }
  return response
}

function update(body, id){
  let reqRobot = robots.find(robot => robot.id === id)
  if(!reqRobot) return {status: 400, message: 'no robot found'}
  for(let i = 0; i < robots.length; i++){
    if(robots[i].id === id){
      robots[i].name = body.name
      robots[i].objective = body.objective
      robots[i].materials = body.materials
    }
  }
  return reqRobot
}

function destroy(id){
  let reqRobot = robots.find(robot => robot.id === id)
  for(let i = 0; i < robots.length; i++){
    if(robots[i].id === id){
      robots.splice(i, 1)
    }
  }
  if(!reqRobot) return {status: 400, message: 'no robot found'}
  return reqRobot
}

module.exports = {getAll, getOne, create, update, destroy}
