export type TeamImage = {
    url: string;
};

export type TeamUser = {
    id?: number;
    name: string;
    description?: string;
    image?: {
        url: string;
    };
};

export type TeamRating =
    | number
    | {
        value?: number;
    };

export type Team = {
    id: number;
    name: string;
    description?: string;
    day?: string;
    time?: string;
    image: TeamImage;
    user: TeamUser;
    ratings: TeamRating[];
};