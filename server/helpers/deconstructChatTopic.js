/*
 * this helper ensures the request coming in has the proper keys for chat topics
 */

function deconstructChatTopic(chatObject, flag) {
  const { id, topicTitle, description } = chatObject

  if (flag === 'update' || flag === 'delete') {
    if (!id) throw new Error(`Provide id to ${flag} chat topic`)
  }

  if (!flag) {
    if (!topicTitle)
      throw new Error('Provide topic title to create new chat topic')

    if (!description)
      throw new Error('Provide description to create new chat topic')
  }
}

module.exports = { deconstructChatTopic }
