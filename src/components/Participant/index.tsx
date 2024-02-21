import { Check, Trash } from "lucide-react-native";
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
        <TouchableOpacity onLongPress={() => handleConfirmPresence(participant.id)} style={{flexDirection:"row", alignItems: "center", paddingLeft: 15, gap: 5}}>
            {participant.present && <Check size={20} color="#fff" fontStyle="italic" /> }
            <Text  style={styles.participantName} key={participant.id}>{participant.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleRemoveParticipant(participant.id)}>
            <Text style={styles.buttonText}>
                <Trash color="white" size={20}/>
            </Text>
        </TouchableOpacity>
    </View>
    )
}