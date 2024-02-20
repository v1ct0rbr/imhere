import { Button, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ParticipantModel } from "../../screens/Home";


interface ParticipantProps{
    participant: ParticipantModel,
    handleRemoveParticipant: (participantId: number) => void
}

export function Participant({participant, handleRemoveParticipant} : ParticipantProps) {
    return (
    <View style={styles.participantItem}>
        <Text style={styles.participantName} key={participant.id}>{participant.name}</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleRemoveParticipant(participant.id)}>
            <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
    </View>
    )
}