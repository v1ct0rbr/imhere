import { Trash } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { ParticipantModel } from "../../screens/Home";
import { styles } from "./styles";


interface ParticipantProps{
    participant: ParticipantModel,
    handleRemoveParticipant: (participantId: number) => void
}

export function Participant({participant, handleRemoveParticipant} : ParticipantProps) {
    return (
    <View style={styles.participantItem}>
        <Text style={styles.participantName} key={participant.id}>{participant.name}</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleRemoveParticipant(participant.id)}>
            <Text style={styles.buttonText}>
                <Trash color="white" size={20}/>
            </Text>
        </TouchableOpacity>
    </View>
    )
}