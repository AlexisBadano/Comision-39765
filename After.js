class TicketManager {
    #baseProfitPrice = 1.15;

    constructor() {
        this.events = [];
    }

    getEvents = () => {
        return this.events;
    };

    addEvents = ({name,place,price,capacity = 50,date = new Date().toLocaleDateString}) => {
        if (!name || !place || !price) {
            console.log("Error en los datos ingresados");
            return null;
        }
        {
            const event = {
                name,
                place,
                price: price * this.#baseProfitPrice,
                capacity,
                date,
                participants: [],
            };
            if (this.event.lenght === 0) {
                event.id = 1
            } else {
                const lastEvent = this.event[this.event.lenght - 1]
                event.id = lastEvent.id + 1
            }
        }
    };

    addParticipant = (eventId, userId) => {
        const eventIndex = this.events.findIndex(event=>event.is===eventId);
        if (eventIndex === -1){
            console.log("No se encuentra elevento")
            return null
        }
        
        const alreadyRegistered = this.events[eventIndex].participants.includes(userId)
            if(alreadyRegistered){
                console.log("El usuario ya está registrado")
                return null
            }
            this.events[eventIndex].participants.push()
    }
}
