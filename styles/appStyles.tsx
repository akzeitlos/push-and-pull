import { Platform, StyleSheet } from 'react-native';

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    padding: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    width: '80%'
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    color: 'white'
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  loader: {
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  buttonPressed: {
    backgroundColor: 'rgba(102, 16, 105, 1)',
  },
  registerText: {
    marginTop: 20,
    color: 'white',
  },
  link: {
    color: 'rgba(102, 16, 105, 1)',
    textDecorationLine: 'none',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  tabBarStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    ...(Platform.select({
      ios: { position: 'absolute' },
      android: { position: 'absolute' },
      web: {}, // oder anpassen
    })),
  },
  containerprofile: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    padding: 16,
    width: "100%",
    justifyContent: "space-between",
  },
  profileIcon: {
    height: 32,
    width: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  menuContent: {
    backgroundColor: "black",
    borderRadius: 0,
    minWidth: 150,
    alignSelf: "flex-end", // Align dropdown to right
    marginRight: -14, // Fine-tune if needed
    marginTop: 50,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  menuItem: {
    backgroundColor: "black", // default background
    opacity: 1,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    marginBottom:20,
    marginTop:-10
  },
});

export default appStyles;
