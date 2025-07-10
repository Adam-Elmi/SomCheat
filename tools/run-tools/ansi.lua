local ansi = {}
function ansi.colorize(text, color)
    local colors = {
        reset = "\27[0m",
        red = "\27[31m",
        green = "\27[32m",
        yellow = "\27[33m",
        blue = "\27[34m",
        magenta = "\27[35m",
        cyan = "\27[36m",
        white = "\27[37m",
        black = "\27[30m",
        bright_black = "\27[90m",
        bright_green = "\27[92m",
        bright_yellow = "\27[93m",
        bright_blue = "\27[94m",
        bright_white = "\27[97m",
    }

    text = text or ""

    return (colors[color] or colors.reset) .. text .. colors.reset
end

return ansi