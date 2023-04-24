export default function getEntities(data) {
  const entities = {}
  const ids = []

  data.forEach((item) => {
    const { id } = item
    entities[id] = item
    ids.push(id)
  })

  return [entities, ids]
}
