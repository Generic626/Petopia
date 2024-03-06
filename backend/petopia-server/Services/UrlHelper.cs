namespace petopia_server.Services;
public class UrlHelper(IHttpContextAccessor httpContextAccessor)
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

    public string? GetImageFullPath(string? imageName)
    {
        if (imageName == null)
        {
            return null;
        }

        var httpContext = _httpContextAccessor.HttpContext ?? throw new InvalidOperationException("HTTP context is not available.");
        var request = httpContext.Request;
        return $"{request.Scheme}://{request.Host.Value}/images/{imageName}";
    }
}