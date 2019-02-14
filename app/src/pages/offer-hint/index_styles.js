import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  "container": {
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0,
    "display": "flex",
    "flexDirection": "column",
    "paddingTop": 0,
    "paddingRight": 16,
    "paddingBottom": 0,
    "paddingLeft": 16,
    "height": "100%",
    "backgroundColor": "#f3f3f3"
  },
  "top": {
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
  },
  "bottom": {
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0
  },
  "desc-item": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center"
  },
  "mb": {
    "marginBottom": 10
  },
  "desc-text": {
    "width": "100%",
    "fontSize": 14,
    "textAlign": "center",
    "color": "#101010"
  },
  "copy": {
    "marginTop": 20,
    "height": 30,
    "display": "flex",
    "flexDirection": "row",
    "borderRadius": 6,
    "borderWidth": 0.5,
    "borderStyle": "solid",
    "borderColor": "#44bdf7",
    "overflow": "hidden"
  },
  "copy-text-wrapper": {
    "flexGrow": 1,
    "flexShrink": 1,
    "flexBasis": 0,
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingLeft": 5,
    "backgroundColor": "#fff"
  },
  "copy-text": {
    "fontSize": 14,
    "color": "red"
  },
  "copy-btn": {
    "height": "100%",
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingTop": 0,
    "paddingRight": 10,
    "paddingBottom": 0,
    "paddingLeft": 10,
    "backgroundColor": "#44bdf7",
    "color": "#fff",
    "fontSize": 14
  }
})