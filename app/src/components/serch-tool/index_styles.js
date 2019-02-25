import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  "container": {
    "position": "absolute",
    "left": 0,
    "right": 0,
    "zIndex": 1,
    "paddingTop": 5,
    "paddingRight": 10,
    "paddingBottom": 5,
    "paddingLeft": 10
  },
  "content": {
    "height": 40,
    "paddingTop": 0,
    "paddingRight": 10,
    "paddingBottom": 0,
    "paddingLeft": 10,
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "backgroundColor": "rgba(255, 255, 255, 0.6)",
    "borderRadius": 10
  },
  "search-input": {
    "fontSize": 10
  },
  "icon-btn-group": {
    "flexDirection": "row",
    "alignItems": "center"
  },
  "mr": {
    "marginRight": 10
  },
  "icon-btn": {
    "width": 20,
    "height": 20
  }
})