// Usage: {{ items | group_by:"name" }}
export default function (input, property) {
  let groups = []
  input.forEach((item) => {
    let name = item[property]
    let group = groups.find((el) => el.name === name)
    if (group) {
      group.items.push(item)
    } else {
      group = {
        name,
        items: [item],
      }
      groups.push(group)
    }
  })
  groups.forEach((group) => (group.size = group.items.length))
  return groups
}
