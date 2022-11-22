import { XMLParser } from 'fast-xml-parser'

const contentTypes = {
  json: (data) => ({
    formattedData: JSON.stringify(data),
    contentType: 'application/json',
  }),
  xml: (data) => {
    const parser = new XMLParser()
    const json = parser.parse(data)
    return {
      formattedData: JSON.stringify(json),
      contentType: 'application/xml',
    }
  },
}

export default contentTypes
