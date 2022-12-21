export const socketMiddleware = (wsActions) => {
    return store => {
        let socket = null;
        let url = '';

        return next => action => { 
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsConnection, wsOffline, wsOpen, wsError, wsMessage, wsClose } = wsActions;

            if (type === wsConnection) {
                socket = new WebSocket(payload);
            }

            if (type === wsOffline) {
                socket = null;
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: wsOpen, payload: true });
                };
                socket.onerror = event => {
                    dispatch({ type: wsError, payload: event });
                };
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: wsMessage, payload: parsedData });
                };
                socket.onclose = event => {
                    dispatch({ type: wsClose, payload: event.code.toString() });
                };
            }

            next(action);
        };
    };
}; 