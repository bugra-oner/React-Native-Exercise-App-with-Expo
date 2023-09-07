import { StyleSheet } from "react-native";

import { fp,wp,hp } from "../../utils";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
      },
      text: {
        fontSize: 20,
        color: '#fff',
        marginBottom: hp(0.5)
      },
      setsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: hp(2)
      },
      setTextContainer: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginHorizontal : wp(1.5),
      },
      activeSetContainer: {
        backgroundColor: '#d35400',
      },
      setText: {
        fontSize: fp(3),
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
        color: '#fff',
        marginTop: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical : 15,
      },
      test:{
        backgroundColor : 'red',
        width : 100,
        height : 100,
        borderRadius : 100,
      }
});

export default styles;
