import { Text, View, TextInput, Button, TouchableOpacity, TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import { styles } from "./styles";
import {Participants } from "../../components/Participants";
import { SyntheticEvent, useState } from "react";

export interface Participant {
    id: number,
    name: string
}

export function Home() {

   
    const [participantName, setParticipantName] = useState("");
    const [participants, setParticipants] = useState<Participant[]>([])
    const [currId, setCurrId] = useState(1);

    function handleRemoveParticipant(selectedParticipantId: number) {
        setParticipants(participants.filter(participant => participant.id !== selectedParticipantId))        
    }

    function handleParticipantAdd() {    
        if(participantName.trim() != '') {
            setParticipants([...participants, {id: currId, name: participantName}]);
            setParticipantName(""); 
            setCurrId(state => state + 1);
        }   
             
    }

   


    return (
        <View style={styles.container}>
            <View style={styles.eventInfo}>
                <Text style={styles.title}>Nome do evento</Text>
                <Text style={styles.content}>4 de novembro de 2022</Text>
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Nome do participante" placeholderTextColor="#6b6b6b" value={participantName} onChangeText={text => setParticipantName(text)} />
                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <Participants participants={participants} handleRemoveParticipant={handleRemoveParticipant} />
        </View>
    )
}