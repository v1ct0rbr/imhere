import { View, Text, Touchable, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../screens/Home";
import { useState } from "react";


interface ParticipatnsProps {
    participants: Participant[],
    handleRemoveParticipant: (selectedParticipantId: number) => void

}

export function Participants({ participants, handleRemoveParticipant }: ParticipatnsProps) {


    return (
        <View style={styles.container}>
            <Text>Lista</Text>
            {participants.map(participant => {
                return (
                    <View>
                        <Text key={participant.id}>{participant.name}</Text>
                        <TouchableOpacity onPress={() => handleRemoveParticipant(participant.id)}>
                            <Text >-</Text>
                        </TouchableOpacity>
                    </View>
                )
            })}


        </View>
    )
}