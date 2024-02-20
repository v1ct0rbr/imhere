import { FlatList, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { styles } from "./styles";

import { useState } from "react";
import { Participant } from "../../components/Participant";

export interface ParticipantModel {
    id: number
    name: string
}

export function Home() {

   
    const [participantName, setParticipantName] = useState("");
    const [participants, setParticipants] = useState<ParticipantModel[]>([])
    const [nextId, setNextId] = useState(1);

    function handleRemoveParticipant(selectedParticipantId: number) {
        const selectedParticipant = participants.find(p => p.id === selectedParticipantId);
        
        if(selectedParticipant){
            Alert.alert('Atenção', `Deseja realmente apagar o participante "${selectedParticipant.name}"`, [
                {text: 'sim', onPress: () => {
                    setParticipants(participants.filter(participant => participant.id !== selectedParticipantId))        
                }},{
                    text: 'não', style: 'cancel'
                }
            ])
        }
   
    }

    function handleParticipantAdd() {    
    
        if(participantName.trim() != ''){
            if(participants.findIndex(part => part.name.trim() === participantName) >= 0){
                Alert.alert('Atenção', 'Já existe um participante com o nome fornecido.')
            }else{
                setParticipants([...participants, {id: nextId, name: participantName.trim()}]);
                setParticipantName(""); 
                setNextId(state => state + 1);
            }
        }else{
            Alert.alert('Atenção', 'Fornceça um nome válido.')
        }
        
      
             
    }
    function handleRemoveAll() {    
        Alert.alert('Atenção', 'Remover todos os participantes? ', [
            {text: 'Sim', onPress: () => {
                setParticipants([]);
                setParticipantName(""); 
                setNextId(1);
            }},
            {text: 'Não', style: 'cancel'}
        ])
        
             
    }

       return (
        <View style={styles.container}>
            <View style={styles.eventInfo}>
                <Text style={styles.title}>Nome do evento</Text>
                <Text style={styles.content}>4 de novembro de 2022</Text>
            </View>
            <View style={{alignItems: "flex-end", gap: 2}} >
                   <View style={styles.form}>
                       <TextInput style={styles.input} placeholder="Nome do participante" placeholderTextColor="#6b6b6b" value={participantName} onChangeText={text => setParticipantName(text)} />
                       <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                           <Text style={styles.buttonText}>+</Text>
                       </TouchableOpacity>
                   </View>
                   <TouchableOpacity onPress={handleRemoveAll}>
                       <Text style={styles.content}>remover todos</Text>
                   </TouchableOpacity>
            </View>
            <Text style={styles.containerTitle}>Lista de participantes</Text>
            <FlatList 
                data={participants} 
                keyExtractor={item => item.id.toString()} 
                renderItem={({item}) => (
                    <Participant
                        key={item.id}
                        participant={item} 
                        handleRemoveParticipant={() => handleRemoveParticipant(item.id)}
                        />
                )} showsVerticalScrollIndicator={false} ListEmptyComponent={() => (
                    <Text style={styles.content}>Não há participantes</Text>
                )}/>
                       
        </View>
    )
}