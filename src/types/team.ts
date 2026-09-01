export type TeamImage = {
    url: string;
};

export type TeamUser = {
    id: number;
    name: string;
    description: string;
};

export type TeamRating =
    | number
    | {
        value?: number;
    };

export type Team = {
    id: number;
    name: string;
    image: TeamImage;
    user: TeamUser;
    ratings: TeamRating[];
};