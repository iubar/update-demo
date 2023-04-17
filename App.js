import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Updates from 'expo-updates';

export default function App() {
	onPress = async () => {
		try {
			const update = await Updates.checkForUpdateAsync();
			console.log('checkForUpdateAsync() : ' + JSON.stringify(update));
			if (update.isAvailable) {
				const fetchResult = Updates.fetchUpdateAsync(); // Downloads the most recently deployed update to your project from server to the device's local storage. This method cannot be used in development mode, and the returned promise will be rejected if you try to do so
				console.log('fetchUpdateAsync() : ' + JSON.stringify(fetchResult));
				if (fetchResult.isNew) {
					Updates.reloadAsync(); // Instructs the app to reload using the most recently downloaded version
				}
			}
		} catch (error) {
			console.log('ERROR : ' + error.message);
		}
	};

	function printConstants() {
		// Constants
		console.log('***********************');
		console.log('channel : ' + Updates.channel);
		console.log('createdAt : ' + Updates.createdAt);
		console.log('isEmbeddedLaunch : ' + Updates.isEmbeddedLaunch);
		console.log('isEmergencyLaunch : ' + Updates.isEmergencyLaunch);
		console.log('manifest : ' + JSON.stringify(Updates.manifest));
		console.log('releaseChannel : ' + Updates.releaseChannel);
		console.log('runtimeVersion : ' + Updates.runtimeVersion);
		console.log('updateId : ' + Updates.updateId);
		console.log('***********************');
	}

	const eventListener = (event) => {
		if (event.type === Updates.UpdateEventType.ERROR) {
			// Handle error
			console.log('error');
		} else if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
			// Handle no update available
			console.log('No update available');
		} else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
			// Handle update available
			console.log('Update available');
		}
	};
	Updates.useUpdateEvents(eventListener); // React hook to create an UpdateEvent listener subscription on mount, using addListener. It calls remove() on the subscription during unmount.

	useEffect(() => {
		printConstants();
	}, []);

	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			<Button
				onPress={onPress}
				title="Press me"
				color="#841584"
				accessibilityLabel="Learn more about this purple button"
			/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
