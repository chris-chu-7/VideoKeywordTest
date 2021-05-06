from server.common.models import Direction


FPS = 60


class Config:
    FPS = FPS
    VIEWING_DISTANCE_IN_CM = 50
    TRIAL_HEIGHT = 24
    TRIAL_WIDTH = 32

    class HVC:
        WOLF_COLOR = "white"
        SHEEP_COLOR = "yellow"
        DISTRACTOR_COLOR = "white"

    class HVH:
        TRIALS_SET_COUNT = 16
        MIN_INITIAL_WOLF_SHEEP_DISTANCE = 12

        TRIAL_LENGTH = 15
        CAUGHT_THRESHOLD = 2

        # TODO: Provided sizes are diameter and not radius
        SHEEP_SIZE = 0.87
        WOLF_SIZE = 1.3
        DISTRACTOR_SIZE = 1.3

        WOLF_SPEED = 12
        SHEEP_SPEED = 24
        DISTRACTOR_SPEED = 24

        WOLF_DEGREES_PER_FRAME = WOLF_SPEED / FPS
        SHEEP_DEGREES_PER_FRAME = SHEEP_SPEED / FPS
        DISTRACTOR_DEGREES_PER_FRAME = DISTRACTOR_SPEED / FPS

        NUM_DISTRACTORS = 19

        FRAMES_PER_DISTRACTOR_DOT_DIRECTION_CHANGE = 10

        class WOLF:
            WOLF_COLOR = "red"
            SHEEP_COLOR = "yellow"
            DISTRACTOR_COLOR = "white"

        class SHEEP:
            WOLF_COLOR = "white"
            SHEEP_COLOR = "yellow"
            DISTRACTOR_COLOR = "white"
