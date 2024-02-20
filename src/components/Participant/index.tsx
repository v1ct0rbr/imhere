import { Trash } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { ParticipantModel } from "../../screens/Home";
import { styles } from "./styles";


interface ParticipantProps{
    participant: ParticipantModel,
    handleRemoveParticipant: (participantId: string) => void
    handleConfirmPresence: (participantId: string) => void
}

export function Participant({participant, handleRemoveParticipant, handleConfirmPresence} : ParticipantProps) {



    return (
    <View style={[styles.participantItem, participant.present ? styles.ParticipantItemConfirmed: styles.participantItemNormal]}>
        <TouchableOpacity onLongPress={() => handleConfirmPresence(participant.id)}>
        <Text style={styles.participantName} key={participant.id}>{participant.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleRemoveParticipant(participant.id)}>
            <Text style={styles.buttonText}>
                <Trash color="white" size={20}/>
            </Text>
        </TouchableOpacity>
    </View>
    )
}