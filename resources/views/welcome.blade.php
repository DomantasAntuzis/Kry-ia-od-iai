<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        @vite('resources/scss/app.scss')
        @viteReactRefresh
        @vite('resources/js/app.jsx')
    </head>
    <body class="">
<div class="container">

    <table class="table table-sm table-bordered table-black mt-5" style="width: 800px">
  <tbody>
    @for($row = 0; $row < 20; $row++)
      <tr>
        @for($col = 0; $col < 15; $col++)
          <td style="width: 20px; background:green;">ą</td>
          @if(($col + 1) % 15 == 0)
            </tr><tr>
          @endif
        @endfor
      </tr>
    @endfor
  </tbody>
</table>
</div>

    <div id="app"></div>
    </body>
</html>
