export type ClassDetailsType = {
    id: number;
    name: string;
    description: string;
    day: string;
    time: string;
    maxParticipants: number;
    userId: number;
    imageId: number;
    user: {
        name: string;
        image: {
            url: string;
        };
    };
    image: {
        url: string;
    };
    ratings: Array<unknown>;
};