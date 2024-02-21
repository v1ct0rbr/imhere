import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import uuid from 'react-native-uuid';
import { styles } from "./styles";

import { Pencil, Plus, SortAsc, SortDesc } from "lucide-react-native";
import React, { useState } from "react";
import { Participant } from "../../components/Participant";

import DateTimePicker,  { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { format } from "date-fns";
import { currentLocale, timeLocale } from "../../utils/constans";

export interface ParticipantModel {
    id: string
    name: string
    present?: boolean
}
const sort_mode_asc = 1;
const sort_mode_desc = -1;

export interface MainEvent {
    name: string
}

export function Home() {

    const [eventName, setEventName] = useState("Novo evento");
    const [eventDateTime, setEventDateTime] = useState(new Date());
    const [eventNameEditMode, setEventNameEdidMode] = useState(false)
    const [eventDateEditMode, setEventDateEditMode] = useState(false)
    const [dateMode, setDateMode] = useState<'date'|'time'>('date');
    const [eventSelectedDate, setEventSelectedDate] = useState(new Date());
    const [eventSelectedTime, setEventSelectedTime] = useState(new Date())

    const [participantName, setParticipantName] = useState("");
    const [participants, setParticipants] = useState<ParticipantModel[]>([])
    const [nextId, setNextId] = useState(1);
    const [sortMode, setSortMode] = useState(sort_mode_asc)


    const eventeNameInputRef = React.useRef<TextInput>(null);


    const showDatePicker = () => {
      setDateMode('date');
    };
    
    const showTimePicker = () => {
      setDateMode('time');
    };


    function handleRemoveParticipant(selectedParticipantId: string) {
        const selectedParticipant = participants.find(p => p.id === selectedParticipantId);
        if (selectedParticipant) {
            Alert.alert('Atenção', `Deseja realmente apagar o participante "${selectedParticipant.name}"`, [
                {
                    text: 'sim', onPress: () => {
                        setParticipants(participants.filter(participant => participant.id !== selectedParticipantId))
                    }
                }, {
                    text: 'não', style: 'cancel'
                }
            ])
        }

    }

    function handleConfirmPresence(selectedParticipantId: string) {
        const selectedParticipant = participants.find(p => p.id === selectedParticipantId);
        let participantsTemp = [] as Array<ParticipantModel>;
        if (selectedParticipant) {
            Alert.alert('Atenção', (selectedParticipant.present ? `Tirar` : `Confirmar`) + ` presença do participante "${selectedParticipant.name}"`, [
                {
                    text: 'sim', onPress: () => {
                        participantsTemp = [...participants.filter(participant => participant.id !== selectedParticipantId), 
                            {id: selectedParticipantId, name: selectedParticipant.name, present: !selectedParticipant.present }];
                        handleSortList(participantsTemp, false);
                        
                    }
                }, {
                    text: 'não', style: 'cancel'
                }
            ])
        }

    }

    function handleParticipantAdd() {
        let participantsTemp = [] as Array<ParticipantModel>
        if (participantName.trim() != '') {
            if (participants.findIndex(part => part.name.trim() === participantName) >= 0) {
                Alert.alert('Atenção', 'Já existe um participante com o nome fornecido.')
            } else {
                participantsTemp = [...participants, { id: uuid.v4().toString() , name: participantName.trim() }]
                handleSortList(participantsTemp, false);
                setParticipantName("");
                setNextId(state => state + 1);

            }
        } else {
            Alert.alert('Atenção', 'Fornceça um nome válido.')
        }
    }


    function handleSortList(participantsToBeSorted: ParticipantModel[], changeSortMode: boolean) {

        let sortModeTmp = sortMode;
        if (changeSortMode) {
            sortModeTmp *= -1;
            setSortMode(sortModeTmp);
        }
        setParticipants(participantsToBeSorted.sort((a: ParticipantModel, b: ParticipantModel): number => {
            if (a.name > b.name)
                return 1 * sortModeTmp
            else if (a.name < b.name)
                return -1 * sortModeTmp
            else
                return 0
        }))
    }

    function handleRemoveAll() {
        Alert.alert('Atenção', 'Remover todos os participantes? ', [
            {
                text: 'Sim', onPress: () => {
                    setParticipants([]);
                    setParticipantName("");
                    setNextId(1);
                    setSortMode(sort_mode_asc);
                }
            },
            { text: 'Não', style: 'cancel' }
        ])
    }

    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
         

        if (selectedDate) {
            if (dateMode == 'date') {
                setEventDateTime(selectedDate);
                showTimePicker();
            }

            if (dateMode == "time") {
                let dateTemp = eventDateTime;
                dateTemp.setHours(selectedDate.getHours());
                dateTemp.setMinutes(selectedDate.getMinutes());
                dateTemp.setSeconds(selectedDate.getSeconds());
                setEventDateEditMode(false);
                setEventDateTime(dateTemp);
            }
        }
       
      };
    const onShowMode = (currentMode: 'date' | 'time') => {
        setEventDateEditMode(true);
        setDateMode(currentMode);
    }

   

    return (
        <View style={styles.container}>
            <View style={styles.eventInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 48, gap: 6 }}>
                    {eventNameEditMode ?
                        <TextInput ref={eventeNameInputRef} autoFocus style={styles.title} value={eventName} onBlur={() => setEventNameEdidMode(false)} onChangeText={e => setEventName(e)} /> :
                        <Text style={styles.title}>{eventName}</Text>
                    }
                    <TouchableOpacity onPress={() => { setEventNameEdidMode(true) }}>
                        <Pencil size={20} color="white"></Pencil>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {showDatePicker(); setEventDateEditMode(true); }}>
                    <Text style={styles.content}>{format(eventDateTime, timeLocale.format, { locale: currentLocale })}</Text>
                </TouchableOpacity>
                {eventDateEditMode &&  <DateTimePicker mode={dateMode} value={eventDateTime} onChange={onChangeDate}  />}
                   
                
            </View>
            <View style={{ alignItems: "flex-end", gap: 2 }} >
                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder="Nome do participante" placeholderTextColor="#6b6b6b" value={participantName} onChangeText={text => setParticipantName(text)} />
                    <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                        <Text style={styles.buttonText}><Plus fontStyle="oblique" color="white" size={20} /></Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleRemoveAll}>
                    <Text style={styles.content}>remover todos</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.containerTitle}>Lista de participantes</Text>
                <TouchableOpacity onPress={() => handleSortList(participants, true)}>
                    {sortMode == sort_mode_asc ? <SortAsc size={20} color="white" /> : <SortDesc size={20} color="white" />}
                </TouchableOpacity>
            </View>
            <FlatList
                data={participants}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Participant
                        key={item.id}
                        participant={item}
                        handleRemoveParticipant={() => handleRemoveParticipant(item.id)}
                        handleConfirmPresence={handleConfirmPresence}
                        
                    />
                )} showsVerticalScrollIndicator={false} ListEmptyComponent={() => (
                    <Text style={styles.content}>Não há participantes</Text>
                )} />

        </View>
    )
}