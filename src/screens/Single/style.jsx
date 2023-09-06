import { StyleSheet } from "react-native"

import { hp } from "../../utils";

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: '#ffffff',
        marginBottom: hp(1)
      },
      setsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom : hp(2)
      },
      setTextContainer: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        backgroundColor: 'rgba(72, 79, 136, 0.8)'
      },
      activeSetContainer: {
        backgroundColor: 'green',
      },
      setText: {
        fontSize: 18,
        color: '#fff',
      },
      activeSetText: {
        color: '#2c3e50',
      },
      image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        alignSelf: "center",
      },
      restTimeText: {
        fontSize: 18,
        color: 'white',
        marginTop: hp(1.5),
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(2.5),
      },
})

export default styles;